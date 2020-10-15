const resetEmailTemplate = (text, sentAt) => `
<div className="email" style="
border: 1px solid black;
padding: 20px;
font-family: sans-serif;
line-height: 2;
font-size: 20px;">
<h2>Hello There!</h2>
<p>${text}</p>
<p>The link is valid for 1 hour from the time this email delivered</p>
<p>From Shop&Cook</p>
<p>${sentAt}</p>
</div>`;

module.exports = resetEmailTemplate;
