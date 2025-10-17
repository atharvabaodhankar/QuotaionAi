// Simple client-side analytics for tracking usage
class SimpleAnalytics {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
  }

  generateSessionId() {
    return Math.random().toString(36).substring(2, 15);
  }

  trackQuotationGenerated(projectType, totalCost) {
    const event = {
      type: 'quotation_generated',
      sessionId: this.sessionId,
      timestamp: Date.now(),
      data: {
        projectType: projectType?.toLowerCase() || 'unknown',
        totalCost,
        sessionDuration: Date.now() - this.startTime
      }
    };

    // Store in localStorage for now (could be sent to analytics service)
    const events = JSON.parse(localStorage.getItem('quotationai_events') || '[]');
    events.push(event);
    
    // Keep only last 50 events
    if (events.length > 50) {
      events.splice(0, events.length - 50);
    }
    
    localStorage.setItem('quotationai_events', JSON.stringify(events));
    
    console.log('📊 Analytics:', event);
  }

  getUsageStats() {
    const events = JSON.parse(localStorage.getItem('quotationai_events') || '[]');
    const quotations = events.filter(e => e.type === 'quotation_generated');
    
    return {
      totalQuotations: quotations.length,
      averageCost: quotations.length > 0 
        ? quotations.reduce((sum, q) => sum + (q.data.totalCost || 0), 0) / quotations.length 
        : 0,
      mostCommonProjectType: this.getMostCommon(quotations.map(q => q.data.projectType))
    };
  }

  getMostCommon(arr) {
    const counts = {};
    arr.forEach(item => counts[item] = (counts[item] || 0) + 1);
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b, '');
  }
}

export default new SimpleAnalytics();