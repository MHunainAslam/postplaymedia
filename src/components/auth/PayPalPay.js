import React from 'react'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
const PayPalPay = ({ pkgprice, handleApprovepaypal }) => {

    const handleError = (err) => {
        console.log('Payment error:', err);
    };
    return (
        <>



            <PayPalScriptProvider options={{ "client-id": 'AY_Wql-Q_GmPwBxin8-cg-EhrH3dxYH5XbfBou9RwfZVCdJiOCBtaOIUPjJOi72lTDR4WEdPi2GegIcT' }}>
                <PayPalButtons
                    createOrder={(data, actions) => {
                        // Define the order creation logic here
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: 'USD',
                                        value: pkgprice,
                                    },
                                    // custom_id: paypalinfostate?.topOrder[0].systemOrderId,
                                },
                            ],
                        });
                    }}
                onApprove={handleApprovepaypal}
                onError={handleError}
                />
            </PayPalScriptProvider>


        </>
    )
}
export default PayPalPay