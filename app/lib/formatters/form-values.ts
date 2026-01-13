import { ShoppingActionEnum, type CreateCheckoutSessionCommand, type CreateCheckoutSessionRequestBody, type CreateOrderFromCheckoutSessionCommand, type OrderCreationRequestBody, type SignupRequestBody } from "../shopping/types";
import { PRICE_ID, PRODUCT_ID } from "../TESTING_MOCKS";

export function formatDataIntoSignupRequest(data: any): SignupRequestBody {
    const SignupRequestBody: SignupRequestBody = {
        intent: ShoppingActionEnum.enum.SIGNUP,
        body: {
            email: data.email,
            password: data.password,
            username: data.username
        }
    }
    return SignupRequestBody;
}

export function formatDataIntoCreateCheckoutSessionRequestBody(data: CreateCheckoutSessionCommand):
    CreateCheckoutSessionRequestBody {
    const command = {
        userId: data.userId,
        tenantId: data.tenantId,
        currency: data.currency
    };

    const items = [
        {
            productId: PRODUCT_ID,
            priceId: PRICE_ID,
            quantity: 1,
            operation: 'ADD' as const
        }
    ];

    const createCheckoutSessionRequestBody: CreateCheckoutSessionRequestBody = {
        intent: ShoppingActionEnum.enum.CREATE_CHECKOUT_SESSION,
        body: {
            command,
            items
        },
    };

    return createCheckoutSessionRequestBody;
}

export function formatDataIntoOrderCreationRequestBody(data: CreateOrderFromCheckoutSessionCommand):
    OrderCreationRequestBody {

    const orderCreationRequestBody: OrderCreationRequestBody = {
        intent: ShoppingActionEnum.enum.CREATE_ORDER,
        body: {
            userId: data.userId,
            tenantId: data.tenantId,
            checkoutSessionId: data.checkoutSessionId
        },
    };

    return orderCreationRequestBody;
}