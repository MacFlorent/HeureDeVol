function parseDate(dateString: string): Date {
    return new Date(dateString);
  }
  
  function formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }