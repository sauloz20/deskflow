import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();
const rollback = new Error('rollback test fixtures');

try {
  await db.$transaction(async tx => {
    const suffix = randomUUID();
    const organization = await tx.organization.create({
      data: { name: 'Organização de teste', slug: 'ci-' + suffix },
    });
    const user = await tx.user.create({
      data: { name: 'Solicitante de teste', email: suffix + '@example.invalid', passwordHash: 'test-fixture-not-a-password' },
    });
    const member = await tx.membership.create({
      data: { organizationId: organization.id, userId: user.id, role: 'REQUESTER' },
    });
    const category = await tx.category.create({
      data: { organizationId: organization.id, name: 'Acessos' },
    });
    const ticket = await tx.ticket.create({
      data: { organizationId: organization.id, requesterId: member.id, categoryId: category.id, protocol: 1, title: 'Teste do banco', description: 'Dados fictícios de CI' },
    });
    await tx.comment.create({
      data: { organizationId: organization.id, ticketId: ticket.id, authorId: member.id, body: 'Mensagem fictícia' },
    });
    await tx.auditEvent.create({
      data: { organizationId: organization.id, ticketId: ticket.id, actorId: member.id, action: 'TICKET_CREATED' },
    });
    const result = await tx.ticket.findUniqueOrThrow({
      where: { organizationId_id: { organizationId: organization.id, id: ticket.id } },
      include: { comments: true, auditEvents: true },
    });
    assert.equal(result.status, 'OPEN');
    assert.equal(result.comments.length, 1);
    assert.equal(result.auditEvents.length, 1);
    throw rollback;
  });
} catch (error) {
  if (error !== rollback) throw error;
  console.log('PostgreSQL: criação, consulta, comentários e auditoria verificados; fixtures revertidas.');
} finally {
  await db.$disconnect();
}
