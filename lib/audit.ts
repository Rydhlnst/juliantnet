import { db } from "@/db"
import { auditLogs } from "@/db/schema"
export async function writeAuditLog(userId: string, action: string, entityType: string, entityId?: string, metadata?: Record<string, unknown>) { await db.insert(auditLogs).values({ id: crypto.randomUUID(), userId, action, entityType, entityId, metadata }) }
