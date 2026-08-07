const meetingEmailTemplate = ({ title, summary, actionItems = [] }) => {
  const safeTitle = title || "Meeting Summary"
  const safeSummary = (summary || "").replace(/\n/g, "<br/>")
  const safeActionItems =
    actionItems.length > 0
      ? actionItems.map((item) => `<li>${item}</li>`).join("")
      : `<li>No action items identified.</li>`

  return `
<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8"/>

<style>

body{
    margin:0;
    padding:40px;
    background:#09090b;
    font-family:Arial,Helvetica,sans-serif;
}

.container{
    max-width:700px;
    margin:auto;
    background:#18181b;
    border-radius:18px;
    overflow:hidden;
    border:1px solid #27272a;
}

.header{
    padding:40px;
    background:linear-gradient(135deg,#7c3aed,#4f46e5);
    color:white;
}

.content{
    padding:40px;
}

.card{
    background:#27272a;
    border-radius:12px;
    padding:24px;
    margin-top:20px;
}

.card h2{
    margin-top:0;
    color:white;
}

.card p{
    color:#d4d4d8;
    line-height:1.8;
}

ul{
    padding-left:20px;
}

li{
    color:#d4d4d8;
    margin-bottom:12px;
}

.footer{
    text-align:center;
    color:#71717a;
    padding:30px;
    font-size:14px;
}

</style>

</head>

<body>

<div class="container">

<div class="header">
<h1>🤖 MeetMind AI</h1>
<p>Your meeting has been processed successfully.</p>
</div>

<div class="content">

<div class="card">
<h2>📌 ${safeTitle}</h2>

<p>${safeSummary}</p>
</div>

<div class="card">

<h2>✅ Action Items</h2>

<ul>

${safeActionItems}

</ul>

</div>

</div>

<div class="footer">

Thanks for using <strong>MeetMind AI</strong> ❤️

</div>

</div>

</body>

</html>
`
}

export default meetingEmailTemplate
