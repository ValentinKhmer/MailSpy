const { post } = require("axios").default;
const pkg = require("../package.json");
require('dotenv').config({ path: '../.env' });


export default async (req, res) => {
	/**
	 * Permet d'optenir l'abrévation du genre d'une personne
	 * @param {String} initial
	 * @returns {String}
	 */
	function gender(initial) {
		switch (initial) {
			case "m":
				return "M.";
			case "f":
				return "Mme";
			default:
				return "Mx";
		}
	}

	await post(
		process.env.WEBHOOK_URL,
		{
			embeds: [
				{
					description: `📬 ${
						req.query.name
							? `**${gender(req.query.gender)} ${req.query.name}**`
							: "*Quelqu'un*"
					} à ouvert votre mail${
						req.query.subject ? ` : **\`${req.query.subject}\`**` : ""
					}!`,
					color: 5403135,
					footer: {
						text: `MailSpy/${pkg.version}`,
					},
					timestamp: new Date().toISOString(),
				},
			],
		},
		{
			headers: {
				"Content-Type": "application/json",
				"User-Agent": `MailSpy/${pkg.version} (by ValentinKh#8062)`,
			},
		}
	);
	
	res.setHeader("Content-Type", "image/png");
	res
		.status(200)
		.send(
			Buffer.from(
				"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
				"base64"
			)
		);
};
