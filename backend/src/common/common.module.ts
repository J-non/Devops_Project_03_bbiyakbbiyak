import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '1y' }
    })
  ],
  providers: [],
  exports: [JwtModule]
})
export class CommonModule { }