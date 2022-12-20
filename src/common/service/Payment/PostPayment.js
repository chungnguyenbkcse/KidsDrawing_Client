import * as crypto from 'crypto';
import { toast } from "react-toastify";

export function postMomo(total_price, ids, idx) {
    //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
    //parameters
    var partnerCode = "MOMOXF6D20220917";
    var accessKey = "HPMTKkWVbUl3tgTL";
    var secretkey = "PBPj1LDu4cIIHE0FKVKJv1B4sRsOT7LU";
    var requestId = partnerCode + new Date().getTime();
    var orderId = requestId;
    var orderInfo = "pay with MoMo";
    var ipnUrl = "https://server.kidsdrawing.site/api/v1/user-register-join-semester/payment?ids=" + ids.toString();

    console.log("ipnUrl", ipnUrl)
    var redirectUrl = "https://kids-drawing-type-script.vercel.app/payment-successfull?ids=" + ids.toString();
    // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
    var amount = total_price;
    var requestType = "captureWallet"
    var extraData = ""; //pass empty value if your merchant does not have stores

    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType 
    //puts raw signature
    console.log("--------------------RAW SIGNATURE----------------")
    console.log(rawSignature)
    var signature = crypto.createHmac('sha256', secretkey)
        .update(rawSignature)
        .digest('hex');
    console.log("--------------------SIGNATURE----------------")
    console.log(signature)

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        accessKey: accessKey,
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        extraData: extraData,
        requestType: requestType,
        signature: signature,
        lang: 'en'
    });
    //Send the request and get the response
    //Create the HTTPS objects
    const https = require('https');
    const options = {
        hostname: 'test-payment.momo.vn',
        port: 443,
        path: '/v2/gateway/api/create',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'charset': 'UTF-8',
            'Content-Length': Buffer.byteLength(requestBody)
        }
    }
    //Send the request and get the response
    const req = https.request(options, res => {
        console.log(`Status: ${res.statusCode}`);
        console.log(`Headers: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (body) => {
            toast.update(idx, { render: "Đang chuyển đán trang thanh toán MOMO!", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
            console.log('Body: ');
            console.log(body);
            console.log('payUrl: ');
            window.open(JSON.parse(body).payUrl, '_blank');
            console.log(JSON.parse(body).payUrl);
        });
        res.on('end', () => {
            toast.update(idx, { render: "Đang chuyển đán trang thanh toán MOMO!", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
            console.log('No more data in response.');
        });
    })

    req.on('error', (e) => {
        toast.update(idx, { render: "Xảy ra lỗi yêu cầu thanh toán MOMO!", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, closeButton: true });
        console.log(`problem with request: ${e.message}`);
    });
    // write data to request body
    console.log("Sending....")
    req.write(requestBody);
    req.end();

}