import { useState } from 'react';
import { Calculator, RefreshCw, MessageCircle, Info } from 'lucide-react';
import logo from './assets/logo.jpg';

export default function App() {
  const [loanAmount, setLoanAmount] = useState('200000');
  const [interestRate, setInterestRate] = useState('10.5');
  const [tenure, setTenure] = useState('18');
  const [tenureType, setTenureType] = useState<'months' | 'years'>('months');
  
  const [result, setResult] = useState<{
    emi: number;
    totalAmount: number;
    totalInterest: number;
  } | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const tenureMonths = tenureType === 'years' 
      ? parseFloat(tenure) * 12 
      : parseFloat(tenure);

    if (!principal || !annualRate || !tenureMonths) {
      alert('Please fill all fields with valid numbers');
      return;
    }

    const monthlyRate = annualRate / 12 / 100;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
                (Math.pow(1 + monthlyRate, tenureMonths) - 1);
                
    const totalAmount = emi * tenureMonths;
    const totalInterest = totalAmount - principal;

    setResult({
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest)
    });
  };

  const resetCalculator = () => {
    setLoanAmount('200000');
    setInterestRate('10.5');
    setTenure('18');
    setTenureType('months');
    setResult(null);
  };

  const bankRates = [
    { bank: 'SBI', rate: '8.15% - 11.15%' },
    { bank: 'HDFC Bank', rate: '9.50% - 13.25%' },
    { bank: 'ICICI Bank', rate: '9.50% - 14.00%' },
    { bank: 'Axis Bank', rate: '9.75% - 13.75%' },
    { bank: 'Kotak Mahindra Bank', rate: '10.50% - 15.00%' },
    { bank: 'Bank of Baroda', rate: '8.85% - 10.95%' },
    { bank: 'Punjab National Bank', rate: '8.25% - 11.25%' },
    { bank: 'Union Bank of India', rate: '8.75% - 10.50%' },
    { bank: 'Canara Bank', rate: '8.60% - 11.00%' },
    { bank: 'IDFC First Bank', rate: '10.50% - 15.50%' },
    { bank: 'Indian Bank', rate: '8.60% - 11.15%' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white h-20 shadow-sm flex items-center justify-between px-6 md:px-12 w-full z-10 sticky top-0">
        <div className="flex items-center gap-2">
          <img src={logo} alt="DegreeBaba Logo" className="h-10 w-auto" />
        </div>
        <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105">
          Education Loan Calculator
        </button>
      </header>

      <main className="flex-grow pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2D3748] via-[#553C9A] to-[#7C3AED] mb-6 tracking-tight">
            Education Loan EMI Calculator
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Plan your higher education seamlessly. Calculate your monthly EMI, total interest payable, and overall repayment amount instantly.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Loan Amount</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-medium text-lg">₹</span>
                  </div>
                  <input 
                    type="number"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-lg font-medium text-gray-900"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    placeholder="200000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Interest Rate (p.a.)</label>
                <div className="relative">
                  <input 
                    type="number"
                    step="0.1"
                    className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-lg font-medium text-gray-900"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    placeholder="10.5"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-medium text-lg">%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700">Loan Tenure</label>
                <div className="flex relative rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <input 
                    type="number"
                    className="flex-grow pl-4 pr-4 py-3 bg-gray-50 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-lg font-medium text-gray-900 z-10"
                    value={tenure}
                    onChange={(e) => setTenure(e.target.value)}
                    placeholder="18"
                  />
                  <select 
                    className="bg-gray-100 border-l border-gray-200 px-4 py-3 font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 z-20 cursor-pointer"
                    value={tenureType}
                    onChange={(e) => setTenureType(e.target.value as 'months' | 'years')}
                  >
                    <option value="months">Months</option>
                    <option value="years">Years</option>
                  </select>
                </div>
              </div>
            </div>

            {!result ? (
              <button 
                onClick={calculateEMI}
                className="w-full py-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Calculator className="w-6 h-6" />
                Calculate EMI
              </button>
            ) : (
              <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center border-b border-gray-100 pb-4">Your Repayment Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl border border-purple-100 text-center">
                    <p className="text-sm font-semibold text-gray-600 mb-2">Monthly EMI</p>
                    <p className="text-3xl font-bold text-purple-700">{formatCurrency(result.emi)}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl border border-purple-100 text-center">
                    <p className="text-sm font-semibold text-gray-600 mb-2">Total Interest</p>
                    <p className="text-3xl font-bold text-purple-700">{formatCurrency(result.totalInterest)}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl border border-purple-100 text-center">
                    <p className="text-sm font-semibold text-gray-600 mb-2">Total Amount Payable</p>
                    <p className="text-3xl font-bold text-purple-700">{formatCurrency(result.totalAmount)}</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={resetCalculator}
                    className="flex-1 py-3 rounded-full bg-gray-100 text-gray-800 font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 border border-gray-300"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Calculate Again
                  </button>
                  <button className="flex-1 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Talk to an Expert
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bank Rates Table */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Current Education Loan Interest Rates (2024)</h2>
              <p className="text-gray-600">Compare rates across top banks to find the best deal for your education.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                    <th className="py-4 px-6 font-semibold text-lg whitespace-nowrap">Bank Name</th>
                    <th className="py-4 px-6 font-semibold text-lg whitespace-nowrap">Interest Rate (p.a.)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-700">
                  {bankRates.map((bank, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="py-4 px-6 font-medium whitespace-nowrap">{bank.bank}</td>
                      <td className="py-4 px-6 whitespace-nowrap">{bank.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-blue-50 p-6 flex items-start gap-4">
              <Info className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800 leading-relaxed">
                <strong>Note:</strong> Interest rates mentioned are indicative and subject to change based on the loan amount, university, course, collateral, and applicant's credit profile. Always verify with the respective bank for the final offer.
              </p>
            </div>
          </div>
        </div>

        {/* EMI Formula Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How is Education Loan EMI Calculated?</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Banks in India use the <strong>Reducing Balance Method</strong> to calculate EMI on education loans. This means interest is calculated only on the outstanding principal amount, not the original principal. The mathematical formula used is:
            </p>
            
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 mb-8 flex justify-center items-center">
              <div className="text-2xl md:text-3xl font-mono text-gray-800 font-semibold text-center overflow-x-auto w-full py-4">
                EMI = [P &times; r &times; (1 + r)<sup>n</sup>] / [(1 + r)<sup>n</sup> &minus; 1]
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-purple-50 p-5 rounded-xl border border-purple-100">
                <h4 className="text-lg font-bold text-purple-900 mb-2">P = Principal</h4>
                <p className="text-sm text-purple-800">The total loan amount disbursed by the bank.</p>
              </div>
              <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                <h4 className="text-lg font-bold text-blue-900 mb-2">r = Rate</h4>
                <p className="text-sm text-blue-800">The monthly interest rate (Annual rate divided by 12).</p>
              </div>
              <div className="bg-cyan-50 p-5 rounded-xl border border-cyan-100">
                <h4 className="text-lg font-bold text-cyan-900 mb-2">n = Tenure</h4>
                <p className="text-sm text-cyan-800">The total number of months for repayment.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="max-w-4xl mx-auto mb-16 space-y-6">
          <p className="text-gray-600 leading-relaxed text-lg">
            Calculating your EMI beforehand helps you plan your post-graduation finances better. Remember that many banks offer a moratorium period (study period + 6 months to 1 year) during which you might only need to pay simple interest or nothing at all, depending on the loan terms.
          </p>
          <p className="text-gray-600 leading-relaxed text-lg">
            Use this calculator to experiment with different loan amounts and tenures to find a monthly payment that you will be comfortable with once your repayment period begins.
          </p>
          
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg mt-8">
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold text-gray-900">Disclaimer:</span> The Education Loan EMI Calculator provided by DegreeBaba is intended for informational and indicative purposes only. The actual EMI, total interest, and repayment schedule may vary depending on your bank's exact calculation methodology, processing fees, changes in interest rates, and the specific terms of your loan agreement.
            </p>
          </div>
        </div>

        {/* SEO Content Sections */}
        <div className="max-w-4xl mx-auto space-y-12 mb-16">
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What is an Education Loan?</h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-4">
              An education loan is a sum of money borrowed to finance post-secondary education or higher education-related expenses. Education loans are intended to cover the cost of tuition, books and supplies, and living expenses while the borrower is in the process of pursuing a degree.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              These loans often come with favorable terms compared to personal loans, such as lower interest rates and deferred repayment options while the student is still enrolled in their program.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Understanding the Moratorium Period</h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-4">
              One of the unique features of an education loan is the moratorium period, also known as a repayment holiday. This is the duration during which the borrower is not required to make full EMI payments. It typically covers the entire course duration plus an additional 6 to 12 months after graduation or until the student secures a job (whichever is earlier).
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              During this period, banks usually charge simple interest on the disbursed amount. Borrowers can choose to pay this interest during the moratorium to reduce their overall debt burden, or let it accrue and be added to the principal amount when full EMI repayment starts.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits of Taking an Education Loan</h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-4">
              Beyond just funding your studies, education loans offer several significant advantages. Under Section 80E of the Income Tax Act in India, the interest paid on an education loan is completely deductible from taxable income for up to 8 years. This provides substantial tax savings for the borrower or the co-applicant.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              Additionally, taking and responsibly repaying an education loan is an excellent way for young professionals to build a strong credit history early in their careers. It also helps preserve family savings and investments that might otherwise be depleted to fund expensive higher education.
            </p>
          </section>
          
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Secured vs. Unsecured Education Loans</h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-4">
              Education loans generally fall into two categories. Secured loans require collateral, such as property, fixed deposits, or other liquid assets, pledged against the loan amount. These typically offer lower interest rates, higher loan limits (often up to 1.5 Crores or more for foreign studies), and longer repayment tenures.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              Unsecured loans, on the other hand, do not require collateral but rely heavily on the co-applicant's financial profile and the student's academic credentials. They are processed faster but might have higher interest rates and lower maximum limits compared to secured loans.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tips for Managing Your Education Loan</h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-4">
              Effective management of your education loan can save you lakhs of rupees in interest. Firstly, if possible, start paying the simple interest during your moratorium period; this prevents interest capitalization and reduces your final EMI amount. 
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              Secondly, aim to prepay portions of your principal whenever you receive bonuses or extra income. Since education loans in India usually don't carry prepayment penalties, making extra payments directly reduces your outstanding principal, dramatically lowering your total interest payout over the loan's lifetime.
            </p>
          </section>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-gray-900 mt-auto py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 font-medium">
            &copy; {new Date().getFullYear()} DegreeBaba. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
