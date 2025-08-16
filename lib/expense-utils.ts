// Utility functions for expense calculations and formatting

export function calculateTotalExpenses(expenses: any[]): number {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    Food: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    Transport: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    Shopping: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Entertainment: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    Bills: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    Healthcare: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    Others: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  };
  return colors[category] || colors.Others;
}

export function groupExpensesByCategory(expenses: any[]): Record<string, number> {
  return expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);
}

export function getExpensesByDateRange(
  expenses: any[],
  startDate: string,
  endDate: string
): any[] {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= start && expenseDate <= end;
  });
}

export function validateExpenseData(data: {
  title?: string;
  amount?: number | string;
  category?: string;
  date?: string;
}): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.title || data.title.length < 3) {
    errors.push('Title must be at least 3 characters long');
  }

  const amount = typeof data.amount === 'string' ? parseFloat(data.amount) : data.amount;
  if (!amount || amount <= 0) {
    errors.push('Amount must be greater than 0');
  }

  if (!data.category) {
    errors.push('Category is required');
  }

  if (!data.date) {
    errors.push('Date is required');
  } else if (isNaN(Date.parse(data.date))) {
    errors.push('Date must be valid');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
