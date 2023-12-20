import React from 'react'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
const PayPalPay = ({ pkgprice }) => {
    // const handleApprove = async (data, actions) => {
    //     const order = await actions.order.capture();
    //     if (order) {
    //         console.log('Payment was approved!', order, order.purchase_units[0].payments.captures[0].id);
    //         const customId = data.orderID;
    //         // console.log('Custom ID:', customId);
    //         setloading(true)
    //         axios.post(`${app_url}/api/payment/confirmTopUpOrder`, { systemOrderId: paypalinfostate.topOrder[0].systemOrderId, transactionId: order.purchase_units[0].payments.captures[0].id }, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`
    //             }
    //         } )
    //             .then(response => {
    //                 if (response.data.success) {
    //                     document.querySelector('.OrderCompletedModal').click()
    //                     document.querySelector('.close-modal').click()
    //                     setloading(false)
    //                     setSuccess(true)
    //                 }

    //                 else {
    //                     console.log(response.data.message)
    //                     setloading(false)
    //                 }

    //             })
    //             .catch(error => {
    //                 // toast.error(error)
    //                 console.log(error);
    //                 setloading(false)
    //             });
    //     }
    // };

    // const handleError = (err) => {
    //     console.log('Payment error:', err);
    // };
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
                // onApprove={handleApprove}
                // onError={handleError}
                />
            </PayPalScriptProvider>


        </>
    )
}
export default PayPalPay