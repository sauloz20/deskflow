import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly database: DatabaseService) {}

  @Get('ready')
  async readiness() {
    if (!(await this.database.ready())) throw new ServiceUnavailableException('Banco indisponível.');
    return { status: 'ok' };
  }

  @Get()
  check() {
    return { status: 'ok' };
  }
}
