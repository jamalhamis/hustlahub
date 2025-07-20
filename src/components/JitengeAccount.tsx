import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Wallet, 
  Send, 
  Plus, 
  Eye, 
  EyeOff, 
  Shield, 
  History, 
  ArrowUpRight, 
  ArrowDownLeft,
  CreditCard,
  Smartphone,
  AlertTriangle,
  Lock,
  Clock,
  CheckCircle,
  Download
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const JitengeAccount = () => {
  const { user } = useAuth();
  const [showBalance, setShowBalance] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [transferPin, setTransferPin] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [jitengePin, setJitengePin] = useState('');
  const [topUpAmount, setTopUpAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState('mpesa');

  // Mock account balance - in real app this would come from backend
  const accountBalance = 12500;
  const availableBalance = 10200; // After commission holds
  const pendingBalance = 2300; // 48-hour hold amount

  const recentTransactions = [
    {
      id: 1,
      type: 'received',
      amount: 500,
      from: 'John Mwangi (Plumber Service)',
      date: '2024-01-15',
      status: 'completed',
      commission: 75, // 15% of 500
      net_amount: 425
    },
    {
      id: 2,
      type: 'sent',
      amount: 300,
      to: 'Grace Wanjiku (Cleaning Service)',
      date: '2024-01-14',
      status: 'completed',
      fee: 0 // Free transfers
    },
    {
      id: 3,
      type: 'topup',
      amount: 1000,
      from: 'M-Pesa',
      date: '2024-01-12',
      status: 'completed',
      fee: 0
    },
    {
      id: 4,
      type: 'pending',
      amount: 800,
      from: 'Service Completion',
      date: '2024-01-16',
      status: 'hold',
      commission: 120,
      net_amount: 680,
      release_date: '2024-01-18'
    }
  ];

  const handleTransfer = () => {
    if (transferPin.length === 4 && transferAmount && recipientId) {
      if (parseFloat(transferAmount) > availableBalance) {
        alert('Insufficient balance. Please check your available balance.');
        return;
      }
      alert('Transfer successful! All Jitenge-to-Jitenge transfers are completely FREE.');
      setShowTransferModal(false);
      setTransferPin('');
      setTransferAmount('');
      setRecipientId('');
    }
  };

  const handleTopUp = () => {
    if (jitengePin.length === 4 && topUpAmount) {
      alert('Top-up request sent to M-Pesa/Bank. Check your phone for STK Push confirmation.');
      setShowTopUpModal(false);
      setJitengePin('');
      setTopUpAmount('');
    }
  };

  const handleWithdraw = () => {
    if (jitengePin.length === 4 && withdrawAmount) {
      if (parseFloat(withdrawAmount) > availableBalance) {
        alert('Insufficient balance. Please check your available balance.');
        return;
      }
      const method = withdrawMethod === 'mpesa' ? 'M-Pesa' : 'Bank Account';
      alert(`Withdrawal of KSh ${withdrawAmount} to ${method} initiated successfully! Funds will be processed within 24 hours.`);
      setShowWithdrawModal(false);
      setJitengePin('');
      setWithdrawAmount('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Account Balance Card */}
      <Card className="bg-gradient-to-r from-red-600 to-green-600 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Jitenge Account</CardTitle>
              <CardDescription className="text-red-100">
                Your secure digital wallet - FREE transfers within Jitenge network
              </CardDescription>
            </div>
            <Wallet className="w-8 h-8" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-100 mb-1">Total Balance</p>
                <p className="text-3xl font-bold">
                  {showBalance ? `KSh ${accountBalance.toLocaleString()}` : 'KSh ****'}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBalance(!showBalance)}
                className="text-white hover:bg-white/20"
              >
                {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </Button>
            </div>

            {showBalance && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white/20 rounded-lg p-3">
                  <p className="text-red-100">Available Now</p>
                  <p className="text-lg font-bold">KSh {availableBalance.toLocaleString()}</p>
                </div>
                <div className="bg-white/20 rounded-lg p-3">
                  <p className="text-red-100">Pending (48h Hold)</p>
                  <p className="text-lg font-bold">KSh {pendingBalance.toLocaleString()}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex gap-2 mt-6">
            <Button 
              className="bg-white text-red-600 hover:bg-gray-100 flex-1"
              onClick={() => setShowTopUpModal(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Top Up
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-red-600 flex-1"
              onClick={() => setShowTransferModal(true)}
            >
              <Send className="w-4 h-4 mr-2" />
              Transfer (FREE)
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-red-600 flex-1"
              onClick={() => setShowWithdrawModal(true)}
            >
              <Download className="w-4 h-4 mr-2" />
              Withdraw
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2 text-green-600" />
            Security & Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Lock className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold text-sm">PIN Protection</h4>
              <p className="text-xs text-gray-600">4-digit PIN for transfers</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold text-sm">Free Transfers</h4>
              <p className="text-xs text-gray-600">No fees within Jitenge network</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-semibold text-sm">48-Hour Hold</h4>
              <p className="text-xs text-gray-600">Service payments held for security</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <AlertTriangle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <h4 className="font-semibold text-sm">15% Commission</h4>
              <p className="text-xs text-gray-600">Auto-deducted from earnings</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <History className="w-5 h-5 mr-2" />
              Recent Transactions
            </span>
            <Button variant="ghost" size="sm">View All</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full mr-3 ${
                    transaction.type === 'received' ? 'bg-green-100' : 
                    transaction.type === 'sent' ? 'bg-red-100' : 
                    transaction.type === 'pending' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    {transaction.type === 'received' ? 
                      <ArrowDownLeft className="w-4 h-4 text-green-600" /> :
                      transaction.type === 'sent' ?
                      <ArrowUpRight className="w-4 h-4 text-red-600" /> :
                      transaction.type === 'pending' ?
                      <Clock className="w-4 h-4 text-yellow-600" /> :
                      <CreditCard className="w-4 h-4 text-blue-600" />
                    }
                  </div>
                  <div>
                    <p className="font-semibold text-sm">
                      {transaction.type === 'received' ? 'Received from' : 
                       transaction.type === 'sent' ? 'Sent to' : 
                       transaction.type === 'pending' ? 'Pending from' :
                       'Top-up from'} 
                      {' ' + (transaction.from || transaction.to)}
                    </p>
                    <p className="text-xs text-gray-600">{transaction.date}</p>
                    {transaction.commission && (
                      <p className="text-xs text-orange-600">
                        Commission: KSh {transaction.commission} | Net: KSh {transaction.net_amount}
                      </p>
                    )}
                    {transaction.release_date && (
                      <p className="text-xs text-yellow-600">
                        Available: {transaction.release_date}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'received' || transaction.type === 'topup' || transaction.type === 'pending' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'sent' ? '-' : '+'}KSh {transaction.amount.toLocaleString()}
                  </p>
                  <Badge variant="outline" className={`text-xs ${
                    transaction.status === 'hold' ? 'border-yellow-500 text-yellow-700' : ''
                  }`}>
                    {transaction.status}
                  </Badge>
                  {transaction.fee === 0 && transaction.type === 'sent' && (
                    <p className="text-xs text-green-600 mt-1">Free Transfer</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transfer Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Transfer Money (FREE)</CardTitle>
              <CardDescription>Send money to any Jitenge account at no cost</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-800 font-medium">Available Balance: KSh {availableBalance.toLocaleString()}</p>
                <p className="text-xs text-green-600">All transfers within Jitenge network are completely FREE</p>
              </div>
              <div>
                <label className="text-sm font-medium">Recipient Phone/Email</label>
                <Input
                  type="text"
                  placeholder="Enter recipient details"
                  value={recipientId}
                  onChange={(e) => setRecipientId(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Amount (KSh)</label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Jitenge PIN</label>
                <Input
                  type="password"
                  placeholder="Enter 4-digit Jitenge PIN"
                  maxLength={4}
                  value={transferPin}
                  onChange={(e) => setTransferPin(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <Button onClick={handleTransfer} className="flex-1">
                  <Shield className="w-4 h-4 mr-2" />
                  Transfer (FREE)
                </Button>
                <Button variant="outline" onClick={() => setShowTransferModal(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Top Up Modal */}
      {showTopUpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Top Up Account</CardTitle>
              <CardDescription>Add money from M-Pesa or Bank Account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Amount (KSh)</label>
                <Input
                  type="number"
                  placeholder="Enter amount (Min: 10)"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Jitenge PIN</label>
                <Input
                  type="password"
                  placeholder="Enter 4-digit Jitenge PIN"
                  maxLength={4}
                  value={jitengePin}
                  onChange={(e) => setJitengePin(e.target.value)}
                />
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-800">
                  You'll receive an STK Push notification on your phone to confirm the payment.
                </p>
              </div>
              <div className="flex gap-3">
                <Button onClick={handleTopUp} className="flex-1">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Send STK Push
                </Button>
                <Button variant="outline" onClick={() => setShowTopUpModal(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Withdraw Money</CardTitle>
              <CardDescription>Transfer funds to M-Pesa or Bank Account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-800 font-medium">Available Balance: KSh {availableBalance.toLocaleString()}</p>
                <p className="text-xs text-green-600">Withdrawals processed within 24 hours</p>
              </div>
              <div>
                <label className="text-sm font-medium">Withdrawal Method</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={withdrawMethod}
                  onChange={(e) => setWithdrawMethod(e.target.value)}
                >
                  <option value="mpesa">M-Pesa</option>
                  <option value="bank">Bank Account</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Amount (KSh)</label>
                <Input
                  type="number"
                  placeholder="Enter amount (Min: 50)"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Jitenge PIN</label>
                <Input
                  type="password"
                  placeholder="Enter 4-digit Jitenge PIN"
                  maxLength={4}
                  value={jitengePin}
                  onChange={(e) => setJitengePin(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <Button onClick={handleWithdraw} className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Withdraw
                </Button>
                <Button variant="outline" onClick={() => setShowWithdrawModal(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default JitengeAccount;
