import { Global, Module, DynamicModule } from '@nestjs/common';

@Global()
@Module({
    providers: [{
        provide: 'Config',
        useValue: { name: 'config' }
    }],
    exports: [{
        provide: 'Config',
        useValue: { name: 'config' }
    }]
})
export class ConfigModule { }