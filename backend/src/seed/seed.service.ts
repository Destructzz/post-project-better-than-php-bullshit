import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeedService implements OnModuleInit {
    constructor(private readonly userService: UserService) { }

    async onModuleInit() {
        await this.seedAdmin();
    }

    async seedAdmin() {
        const adminEmail = 'admin@email.com';
        const existingAdmin = await this.userService.findByEmail(adminEmail);

        if (!existingAdmin) {
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash('123456', salt);

            await this.userService.create({
                email: adminEmail,
                passwordHash,
                role: 'admin',
            });
            console.log('Default admin user created: admin@email.com / admin');
        } else {
            console.log('Admin user already exists');
        }
    }
}
