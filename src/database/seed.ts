import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { DataSource } from "typeorm";
import { User } from "../users/user.entity";
import * as bcrypt from "bcrypt";

async function seed() {
  console.log("🌱 Starting authentication seed script...");

  // Create NestJS application context (loads ConfigModule, DatabaseModule, entities, etc.)
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const dataSource = app.get(DataSource);
    const userRepository = dataSource.getRepository(User);

    const initialUsers = [
      {
        name: "Admin User",
        email: "admin@gmail.com",
        password: "password",
      },
      {
        name: "Demo Student",
        email: "demo@gmail.com",
        password: "password",
      },
      {

        name: "Test User",
        email: "test@gmail.com",
        password: "password",
      },
    ];

    for (const userData of initialUsers) {
      const existingUser = await userRepository.findOne({
        where: { email: userData.email },
      });

      if (existingUser) {
        console.log(`ℹ️  User already exists: ${userData.email}`);
      } else {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = userRepository.create({
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
        });

        await userRepository.save(user);
        console.log(`✅ Seeded user: ${userData.email} (${userData.name})`);
      }
    }

    console.log("\n🔑 Seeded Credentials for Testing Authentication:");
    console.log("--------------------------------------------------");
    for (const u of initialUsers) {
      console.log(`Email: ${u.email.padEnd(22)} | Password: ${u.password}`);
    }
    console.log("--------------------------------------------------\n");
    console.log("✨ Authentication seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exitCode = 1;
  } finally {
    await app.close();
  }
}

seed();
