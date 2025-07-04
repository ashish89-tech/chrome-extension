let trackingData = {
  isTracking: false,
  todayTime: 0,
  websites: {},
  categories: {
    productive: ['github.com', 'stackoverflow.com', 'docs.google.com', 'codepen.io', 'developer.mozilla.org'],
    unproductive: ['youtube.com', 'twitter.com', 'facebook.com', 'instagram.com', 'reddit.com'],
    neutral: ['google.com', 'wikipedia.org', 'news.google.com']
  }
};

function initializeCharts() {
  const timeChart = document.getElementById('timeChart');
  const weeklyChart = document.getElementById('weeklyChart');
  if (timeChart.getContext) drawPieChart(timeChart);
  if (weeklyChart.getContext) drawBarChart(weeklyChart);
}

function drawPieChart(canvas) {
  const ctx = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 80;
  const data = [
    { label: 'Productive', value: 70, color: '#28a745' },
    { label: 'Unproductive', value: 30, color: '#dc3545' }
  ];
  let currentAngle = 0;
  data.forEach(item => {
    const sliceAngle = (item.value / 100) * 2 * Math.PI;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
    ctx.lineTo(centerX, centerY);
    ctx.fillStyle = item.color;
    ctx.fill();
    currentAngle += sliceAngle;
  });

  // Legend
  ctx.fillStyle = '#28a745';
  ctx.fillRect(centerX - 50, centerY + 100, 15, 15);
  ctx.fillStyle = '#000';
  ctx.font = '12px Arial';
  ctx.fillText('Productive (70%)', centerX - 30, centerY + 112);
  ctx.fillStyle = '#dc3545';
  ctx.fillRect(centerX - 50, centerY + 120, 15, 15);
  ctx.fillStyle = '#000';
  ctx.fillText('Unproductive (30%)', centerX - 30, centerY + 132);
}

function drawBarChart(canvas) {
  const ctx = canvas.getContext('2d');
  const data = [3.2, 4.1, 2.8, 5.5, 4.8, 3.9, 5.2];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const barWidth = 30;
  const maxHeight = 120;
  const maxValue = Math.max(...data);
  data.forEach((value, index) => {
    const barHeight = (value / maxValue) * maxHeight;
    const x = index * 40 + 20;
    const y = canvas.height - barHeight - 30;
    ctx.fillStyle = '#007bff';
    ctx.fillRect(x, y, barWidth, barHeight);
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(days[index], x + barWidth/2, canvas.height - 10);
    ctx.fillText(value + 'h', x + barWidth/2, y - 5);
  });
}

function startTracking() {
  trackingData.isTracking = true;
  updateUI();
  showNotification('Tracking started! 🚀');
}

function pauseTracking() {
  trackingData.isTracking = false;
  updateUI();
  showNotification('Tracking paused ⏸️');
}

function generateReport() {
  const report = generateWeeklyReport();
  showNotification('Weekly report generated! 📊');
  console.log(report);
}

function exportData() {
  const data = JSON.stringify(trackingData, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'productivity-data.json';
  a.click();
  showNotification('Data exported successfully! 💾');
}

function generateWeeklyReport() {
  return {
    totalTime: '32h 15m',
    productiveTime: '24h 30m',
    unproductiveTime: '7h 45m',
    productivityScore: 87,
    topProductiveWebsites: [
      { name: 'github.com', time: '8h 30m' },
      { name: 'stackoverflow.com', time: '6h 15m' },
      { name: 'docs.google.com', time: '4h 45m' }
    ],
    recommendations: [
      'Great job maintaining high productivity!',
      'Consider reducing time on social media',
      'Your coding time has increased by 20% this week'
    ]
  };
}

function updateUI() {
  const status = trackingData.isTracking ? 'Active' : 'Paused';
  document.title = `Productivity Tracker - ${status}`;
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #28a745;
    color: white;
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    z-index: 1000;
    font-weight: 600;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}

// Add animation style
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', function() {
  initializeCharts();
  updateUI();
});

setInterval(() => {
  if (trackingData.isTracking) {
    const currentTime = new Date().toLocaleTimeString();
    console.log(`Tracking active at ${currentTime}`);
  }
}, 60000);
