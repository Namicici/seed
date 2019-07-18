const jsdoc2md = require('jsdoc-to-markdown')
const fs = require('fs')
jsdoc2md.render({
	files: 'src/common/service-api/index.js'
}).then((docs) => {
	console.log(`render success`, docs)
	fs.writeFileSync(`CLOUD_FONT_${(new Date()).toLocaleDateString()}.md`, docs, (err) => {
		if (err) {
			console.log(`生成接口文档出错`)
		} else {
	
		}
	})
}).catch((err) => {
	console.log(`render error`, err)
})

