import { Notification } from "./notification";

describe("unit test for notification", () => {
  it("should create errors", () => {
    const notification = new Notification();

    const error = {
      message: "error message",
      context: "customer",
    };

    notification.addError(error);

    expect(notification.messages("customer")).toBe("customer: error message,");

    const secondError = {
      message: "error message2",
      context: "customer",
    };

    notification.addError(secondError);

    expect(notification.messages("customer")).toBe(
      "customer: error message,customer: error message2,"
    );

    const lastError = {
      message: "error message3",
      context: "order",
    };
    notification.addError(lastError);

    expect(notification.messages("customer")).toBe(
      "customer: error message,customer: error message2,"
    );

    expect(notification.messages()).toBe(
      "customer: error message,customer: error message2,order: error message3,"
    );
  });

  it("should check if notification has at least one error", () => {
    const notification = new Notification();

    const error = {
      message: "error message",
      context: "customer",
    };

    notification.addError(error);

    expect(notification.hasErrors()).toBe(true);
  });

  it("should get all errors props", () => {
    const notification = new Notification();

    const error = {
      message: "error message",
      context: "customer",
    };

    notification.addError(error);

    const errorExpected = {
      message: "error message",
      context: "customer",
    };

    expect(notification.getErrors()).toStrictEqual([errorExpected]);
  });
});
