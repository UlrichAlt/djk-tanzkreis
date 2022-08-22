const Image = require("@11ty/eleventy-img");
const { DateTime } = require("luxon");

async function imageShortCode(src,alt,sizes) { 
	let metadata = await Image(src, { widths: [120,800,1200], outputDir: "./_site/img", formats: ["avif", "jpeg"] });
	let imageAttributes = { alt, sizes, loading: "lazy", decoding: "async" };
	return Image.generateHTML(metadata, imageAttributes, {whitespaceMode: "inline"});
}

module.exports = function(eleventyConfig) {

    eleventyConfig.addPlugin(require("@11ty/eleventy-navigation"));
    eleventyConfig.addPlugin(require("eleventy-plugin-postcss"));
    eleventyConfig.addPlugin(require("@sherby/eleventy-plugin-files-minifier"));
    eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-rss"));
    eleventyConfig.addNunjucksAsyncShortcode("image", imageShortCode);
    eleventyConfig.addPassthroughCopy("src/icons");
    eleventyConfig.addFilter('htmlDateString', (dateObj) => { return
    DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yy-MM-dd'); });

    eleventyConfig.addFilter("readableDate", dateObj => { return
        DateTime.fromJSDate(dateObj, {}).setLocale('de-de').toLocaleString( {
        month: '2-digit', year: '2-digit', day: '2-digit' }); });

    eleventyConfig.addPassthroughCopy("src/docs");

    return { markdownTemplateEngine: "njk", dir: { input: 'src', output: '_site' } };
};
