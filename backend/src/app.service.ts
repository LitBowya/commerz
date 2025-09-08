import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello from Commerz Backend! 🛍️ Africa-targeted e-commerce platform is running.';
  }
}
