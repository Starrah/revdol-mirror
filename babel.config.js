module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    plugins: [
        ["import", {
            "libraryName": "muse-ui",
            "libraryDirectory": "lib",
            "camel2DashComponentName": false
        }, "muse-ui"],
        [
            "import",
            {libraryName: "ant-design-vue", libraryDirectory: "es", style: true},
            "ant-design-vue"
        ]
    ]
}
