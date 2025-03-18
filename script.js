// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Handle smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== "#") {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Account for fixed header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Dashboard tab switching functionality
    const navItems = document.querySelectorAll('.nav-item');
    const dashboardTabs = document.querySelectorAll('.dashboard-tab');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all tabs and nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            dashboardTabs.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Show the corresponding tab
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId + '-tab').classList.add('active');
        });
    });
    
    // Lactate Chart tooltip functionality
    const chartPoints = document.querySelectorAll('.chart-point');
    const tooltip = document.getElementById('chartTooltip');
    
    chartPoints.forEach(point => {
        point.addEventListener('mouseenter', function(e) {
            const value = this.getAttribute('data-value');
            const time = this.getAttribute('data-time');
            
            tooltip.innerHTML = `${time}: ${value} mmol/L`;
            tooltip.style.opacity = '1';
            tooltip.style.left = `${this.offsetLeft}px`;
            tooltip.style.top = `${this.offsetTop - 10}px`;
        });
        
        point.addEventListener('mouseleave', function() {
            tooltip.style.opacity = '0';
        });
    });
    
    // Route Map markers tooltips
    const mapMarkers = document.querySelectorAll('.map-marker');
    
    mapMarkers.forEach(marker => {
        marker.addEventListener('mouseenter', function() {
            this.classList.add('active-marker');
        });
        
        marker.addEventListener('mouseleave', function() {
            this.classList.remove('active-marker');
        });
    });
    
    // Partner logos hover effects
    const partners = document.querySelectorAll('.partner');
    
    partners.forEach(partner => {
        partner.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        partner.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Gauge animation
    const gaugeNeedle = document.getElementById('gauge-needle');
    let angle = 0;
    let direction = 1;
    
    setInterval(function() {
        if (angle > 60) direction = -1;
        if (angle < -10) direction = 1;
        
        angle += direction * 0.5;
        if (gaugeNeedle) {
            gaugeNeedle.style.transform = `translate(-50%, -100%) rotate(${angle}deg)`;
        }
    }, 100);
    
    // Lactate number animation
    const lactateNumber = document.getElementById('lactate-number');
    let lactateValue = 3.5;
    let lactateDir = 1;
    
    setInterval(function() {
        if (lactateValue > 3.7) lactateDir = -1;
        if (lactateValue < 3.3) lactateDir = 1;
        
        lactateValue += lactateDir * 0.02;
        if (lactateNumber) {
            lactateNumber.textContent = lactateValue.toFixed(1);
        }
    }, 1000);

    // Settings form functionality
    const unitSystem = document.getElementById('unitSystem');
    if (unitSystem) {
        unitSystem.addEventListener('change', function() {
            // This would update the units throughout the dashboard
            const isMetric = this.value === 'metric';
            const distanceLabels = document.querySelectorAll('.map-stat-value:first-child, .history-table td:nth-child(3)');
            
            // Convert distances (just as a demo)
            distanceLabels.forEach(label => {
                const text = label.textContent;
                if (isMetric && text.includes('mi')) {
                    const miValue = parseFloat(text.replace(' mi', ''));
                    const kmValue = (miValue * 1.60934).toFixed(1);
                    label.textContent = kmValue + ' km';
                } else if (!isMetric && text.includes('km')) {
                    const kmValue = parseFloat(text.replace(' km', ''));
                    const miValue = (kmValue / 1.60934).toFixed(1);
                    label.textContent = miValue + ' mi';
                }
            });
            
            // Update unit labels
            const unitLabels = document.querySelectorAll('.map-stat-label:first-child');
            unitLabels.forEach(label => {
                label.textContent = isMetric ? 'Distance' : 'Distance';
            });
        });
    }

    // Logout button functionality
    const logoutBtn = document.querySelector('.btn-outline-secondary');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to log out?')) {
                alert('Logged out successfully');
                // In a real app, this would redirect to login page
            }
        });
    }
    
    // Save settings button
    const saveSettingsBtn = document.querySelector('.settings-form .btn-primary');
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', function() {
            alert('Settings saved successfully!');
        });
    }
    
    // App screenshots hover effect
    const appScreenshots = document.querySelectorAll('.app-screenshot');
    
    appScreenshots.forEach(screenshot => {
        screenshot.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
        });
        
        screenshot.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Heatmap days tooltips
    const heatmapDays = document.querySelectorAll('.heatmap-day');
    
    heatmapDays.forEach(day => {
        day.addEventListener('mouseenter', function() {
            // Add intensity level to the tooltip
            let intensity = 'Rest day';
            if (this.classList.contains('level-1')) intensity = 'Light workout';
            if (this.classList.contains('level-2')) intensity = 'Moderate workout';
            if (this.classList.contains('level-3')) intensity = 'Medium workout'; 
            if (this.classList.contains('level-4')) intensity = 'High intensity workout';
            if (this.classList.contains('level-5')) intensity = 'Intense workout';
            
            const date = this.getAttribute('data-date');
            if (date) {
                this.setAttribute('title', `${date}: ${intensity}`);
            }
        });
    });
    
    // Progress chart points tooltips
    const progressPoints = document.querySelectorAll('.progress-point');
    
    progressPoints.forEach(point => {
        point.addEventListener('mouseenter', function() {
            const value = this.getAttribute('data-value');
            const month = this.getAttribute('data-month');
            
            this.setAttribute('title', `${month}: ${value} mmol/L`);
        });
    });
});