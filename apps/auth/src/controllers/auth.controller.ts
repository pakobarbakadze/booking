import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SignInDto } from '../dto/sign-in.dto';
import { SignOutDto } from '../dto/sign-out.dto';
import { SignUpDto } from '../dto/sign-up.dto';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { JwtRefreshTokenGuard } from '../guard/jwt-refresh.guard';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('sign-in')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  signIn(@Request() req: any, @Body() signInDto: SignInDto) {
    return this.authService.signIn(req.user, signInDto.deviceId);
  }

  @Post('sign-out')
  @UseGuards(JwtAuthGuard)
  invalidateToken(
    @Headers('authorization') authorization: string,
    @Body() signOutDto: SignOutDto,
  ) {
    return this.authService.invalidateToken(authorization, signOutDto.deviceId);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req: any) {
    return req.user;
  }

  @Post('refresh-token')
  @UseGuards(JwtRefreshTokenGuard)
  refreshToken(@Headers('authorization') authorization: string) {
    return this.authService.refreshAccessToken(authorization);
  }
}
