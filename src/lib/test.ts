import { InternalFields } from "./InternalFields";
import { UserInputs } from "./UserInputs";

export const test = () => {
  const userInputs = UserInputs.instance;
  userInputs.setAF(1).setF(2);
  console.log(userInputs.AF);

  const internalFields = InternalFields.instance;
  internalFields.ALTE = 1;
};
