import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { LoggingMiddleware } from "./common/middleware/logging.middleware";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";
import { TransformInterceptor } from "./common/interceptors/transform.interceptor";
import { LoggingInterceptor } from "./common/interceptors/logging.interceptor";
import { TimeoutInterceptor } from "./common/interceptors/timeout.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "log", "debug", "verbose"],
  });
  const allowedOrigins = ["http://localhost:5003"];

  // IMPORTANT: Use function origin to echo allowed origin (required when credentials: true)
  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, mobile apps, Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        // echo the origin back
        return callback(null, true);
      }

      // In non-production, optionally allow all local origins (still echoes)
      if (
        process.env.NODE_ENV !== "production" &&
        process.env.ENVIRONMENT !== "PRODUCTION"
      ) {
        return callback(null, true);
      }

      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
      "Access-Control-Request-Method",
      "Access-Control-Request-Headers",
      "userid",
    ],
    exposedHeaders: ["Authorization"],
    credentials: true,
    preflightContinue: false,
    // For legacy browsers sometimes 204 causes problems, 200 is safe too
    optionsSuccessStatus: 204,
  });

  // Optional: ensure Express returns something for OPTIONS if any middleware blocks it
  // (Nest + enableCors should be enough, but this is a safe fallback)
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.options("*", (req, res) => {
    res.sendStatus(200);
  });

  // Swagger
  const config = new DocumentBuilder()
    .setTitle("StudyMate AI API")
    .setDescription("StudyMate AI Backend API Documentation")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  // Middleware
  app.use(new LoggingMiddleware().use);

  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Global filters
  app.useGlobalFilters(new AllExceptionsFilter());

  // Global interceptors
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TransformInterceptor(),
    new TimeoutInterceptor(),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation: http://localhost:${port}/api`);
}
bootstrap();
