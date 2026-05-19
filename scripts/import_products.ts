import { ConvexHttpClient } from "convex/browser";
import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse/sync";
import * as dotenv from "dotenv";
import { api } from "../convex/_generated/api";

dotenv.config({ path: ".env.local" });

const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

async function importProducts() {
  console.log("Purging legacy test products...");
  const purgedCount = await client.mutation(api.products.purgeOldProducts);
  console.log(`Purged ${purgedCount} old products.`);

  const csvFilePath = path.join(__dirname, "../products/Zuzu Minis _Stock Summary (1).csv");
  const fileContent = fs.readFileSync(csvFilePath, "utf-8");

  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  }) as any[];

  console.log(`Found ${records.length} products in CSV.`);

  for (const record of records) {
    const category = record.Category.trim();
    if (!category || category === "BabaSuit Full Set (K.F.T)") continue; // Skip placeholders

    const name = category; // Using category as name for now
    const sku = record.Code !== "-" ? record.Code.trim() : undefined;
    
    // Clean and parse inventory
    const inventory = parseInt(record.Quantity) || 0;
    
    // Clean and parse prices
    const cleanPrice = (val: string) => {
      if (!val || val === "-") return 0;
      return parseFloat(val.replace(/[^\d.]/g, ""));
    };

    const costPrice = cleanPrice(record.Cost);
    let sellingPrice = cleanPrice(record["Selling Price"]);

    // Smart pricing: If selling price is missing, use markup (1.5x)
    if (sellingPrice === 0 && costPrice > 0) {
      sellingPrice = Math.round(costPrice * 1.6); // 60% markup for boutique
    }

    // Skip if no price at all
    if (sellingPrice === 0) continue;

    // Split sizes: "NB, 0-3M, 3-6M & 6-12M" -> ["NB", "0-3M", "3-6M", "6-12M"]
    const rawSizes = record.Size !== "-" ? record.Size : "";
    const sizes = rawSizes
      ? rawSizes
          .split(/[,&]/)
          .map((s: string) => s.trim())
          .filter((s: string) => s.length > 0)
      : [];

    // Determine age group
    let ageGroup = "Newborn";
    if (rawSizes.includes("Y")) ageGroup = "Toddler";
    if (rawSizes.includes("4-5Y") || rawSizes.includes("5-6Y")) ageGroup = "Big Kid";

    // Generate slug
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const product = {
      name,
      description: `Beautifully crafted ${name.toLowerCase()} for your little one. Premium quality, sustainable comfort.`,
      price: sellingPrice,
      costPrice: costPrice > 0 ? costPrice : undefined,
      category,
      inventory,
      images: [], // Images to be added later
      slug,
      sku,
      isFeatured: Math.random() > 0.8, // Randomly feature some items for now
      ageGroup,
      sizes: sizes.length > 0 ? sizes : undefined,
      gender: category.toLowerCase().includes("baba") ? "Boy" : 
              category.toLowerCase().includes("frock") ? "Girl" : "Unisex",
    };

    try {
      // Calling a Convex mutation to upsert the product
      await client.mutation(api.products.upsertProduct, { product });
      console.log(`Imported: ${name}`);
    } catch (error) {
      console.error(`Failed to import ${name}:`, error);
    }
  }

  console.log("Import complete! 🎉");
}

importProducts();
