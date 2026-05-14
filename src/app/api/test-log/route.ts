import { SeverityNumber } from '@opentelemetry/api-logs'

export async function GET() {
  const logger = (globalThis as any).__posthogLogger
  
  if (!logger) {
    return Response.json({ ok: false, message: 'Logger not initialized' }, { status: 500 })
  }

  logger.emit({
    severityNumber: SeverityNumber.INFO,
    severityText: 'INFO',
    body: 'Boutique API Log Test',
    attributes: { 
      route: '/api/test-log',
      shop: 'Zuzu Minis',
      timestamp: new Date().toISOString()
    },
  })

  return Response.json({ ok: true, message: 'Log emitted to PostHog' })
}
