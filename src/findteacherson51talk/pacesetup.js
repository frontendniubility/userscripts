
// xxxxxxxxxxxxxx

function setUpPace(loadScript) {
	//https://gitee.com/tsharp/pace/raw/master/pace.js
	//https://gitee.com/tsharp/pace/raw/v1.2.4/pace.min.js
	return loadScript('https://gitee.com/tsharp/pace/raw/v1.2.4/pace.js')
		.then(ok => new Promise(function (resolve) {
			Pace.Options = {
				ajax: false, // disabled
				document: false, // disabled
				eventLag: false, // disabled
				elements: {
					selectors: ["#filterDialog"],
				},
			}
			alert('pace done')
			resolve()
		}))
}

export default setUpPace