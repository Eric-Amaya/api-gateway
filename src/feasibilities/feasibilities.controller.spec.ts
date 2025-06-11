import { Test, TestingModule } from '@nestjs/testing';
import { FeasibilitiesController } from './feasibilities.controller';

describe('FeasibilitiesController', () => {
  let controller: FeasibilitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeasibilitiesController],
    }).compile();

    controller = module.get<FeasibilitiesController>(FeasibilitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
