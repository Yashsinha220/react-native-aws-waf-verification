import React from 'react';
import WebView from 'react-native-webview';

const patchPostMessageJsCode = `(${String(function () {
	var originalPostMessage = window.ReactNativeWebView.postMessage;
	var patchedPostMessage = function (message, targetOrigin, transfer) {
		originalPostMessage(message, targetOrigin, transfer);
	};
	patchedPostMessage.toString = function () {
		return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
	};
	window.ReactNativeWebView.postMessage = patchedPostMessage
})})();`;

/**
 * 
 * @param {*} onMessage: callback after received response, error of Google captcha or when user cancel
 * @param {*} siteKey: your site key of Google captcha
 * @param {*} style: custom style
 * @param {*} url: base url
 * @param {*} languageCode: can be found at https://developers.google.com/recaptcha/docs/language
 * @param {*} cancelButtonText: title of cancel button
 */
const AwfWafCaptcha = ({apikey , onSuccess , onError , sdkurl  }) => {
	const generateTheWebViewContent = siteKey => {
		const originalForm =
			`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Human Verification</title>
    <style>
        body {
            font-family: "Arial";
        }
    </style>
    <script type="text/javascript" src="${sdkurl}"
        defer></script>

<body>
    <div id="captcha-container"></div>
    <script type="text/javascript">
        window.addEventListener("load", function () {
            const container = document.querySelector("#captcha-container");
            window.AwsWafCaptcha.renderCaptcha(container, {
                apikey : ${apikey},
                onSuccess : ${onSuccess},
                onError : ${onError},
                
            })
        });
    </script>
  
</body>

</html>`;
		return originalForm;
	};
	return (
		<WebView
			originWhitelist={['*']}
			mixedContentMode={'always'}
			onMessage={onMessage}
			javaScriptEnabled
			injectedJavaScript={patchPostMessageJsCode}
			automaticallyAdjustContentInsets
			style={[{ backgroundColor: 'transparent', width: '100%' }, style]}
			source={{
				html: generateTheWebViewContent(sdkurl),
			}}
		/>
	);
}

export default AwfWafCaptcha;