import { Controller, Get, HttpStatus } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { ApiResponse } from 'src/common/types/ApiResponse.interface';

@Controller('health')
export class HealthController {
  constructor(private health: HealthCheckService) {}

  @Get()
  @HealthCheck()
  async check(): Promise<ApiResponse<any>> {
    try {
      const healthResult = await this.health.check([
        () => ({ api: { status: 'up' } }),
      ]);
      return {
        statusCode: HttpStatus.OK,
        message: 'Health check OK',
        data: healthResult,
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Error in health check',
        data: null,
      };
    }
  }
}
