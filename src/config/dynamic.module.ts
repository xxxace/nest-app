import { Global, Module, DynamicModule } from "@nestjs/common";

@Global()
@Module({})
export class MyDynamicModule {
    static forRoot(option: string): DynamicModule {
        return {
            module: MyDynamicModule,
            providers: [{
                provide: 'Dynamic',
                useValue: { name: 'Dynamic', option }
            }],
            exports: [{
                provide: 'Dynamic',
                useValue: { name: 'Dynamic', option }
            }]
        }
    }
}