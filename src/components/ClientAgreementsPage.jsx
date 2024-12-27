import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText, Send, UserPlus } from 'lucide-react';

const ClientAgreementsPage = () => {
  const [clients, setClients] = useState([
    // Sample data - replace with actual API call
    { 
      id: 1, 
      name: 'John Doe',
      agreements: [
        { id: 1, type: 'Wrap Fee', status: 'Signed', date: '2024-01-15' },
        { id: 2, type: 'Privacy Policy', status: 'Signed', date: '2024-01-15' }
      ]
    }
  ]);

  const [showNewAgreement, setShowNewAgreement] = useState(false);
  
  const networthRanges = [
    '0-100k',
    '100k-250k',
    '250k-500k',
    '500k-1M',
    '1M-5M',
    '5M+'
  ];

  const [newAgreement, setNewAgreement] = useState({
    clientName: '',
    clientEmail: '',
    networth: '',
    feeAmount: '',
    isDiscretionary: false,
    investmentObjectives: '',
    riskTolerance: '',
    timeHorizon: '',
    employmentStatus: '',
    taxBracket: ''
  });

  const handleCreateAgreement = () => {
    // TODO: Implement API call to create and send agreement
    console.log('Creating new agreement:', newAgreement);
    setShowNewAgreement(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Client Agreements</h1>
        <Button onClick={() => setShowNewAgreement(true)}>
          <UserPlus className="w-4 h-4 mr-2" />
          New Agreement
        </Button>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Active Clients and Agreements</h2>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client Name</TableHead>
                <TableHead>Agreements</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>
                    {client.agreements.map((agreement) => (
                      <div key={agreement.id} className="mb-1">
                        {agreement.type}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    {client.agreements.map((agreement) => (
                      <div key={agreement.id} className="mb-1">
                        {agreement.status}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="mr-2">
                      <FileText className="w-4 h-4" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showNewAgreement} onOpenChange={setShowNewAgreement}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Client Agreement</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Client Name</label>
                <Input
                  value={newAgreement.clientName}
                  onChange={(e) => setNewAgreement({...newAgreement, clientName: e.target.value})}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Client Email</label>
                <Input
                  type="email"
                  value={newAgreement.clientEmail}
                  onChange={(e) => setNewAgreement({...newAgreement, clientEmail: e.target.value})}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Net Worth Range</label>
                <Select
                  value={newAgreement.networth}
                  onValueChange={(value) => setNewAgreement({...newAgreement, networth: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select net worth range" />
                  </SelectTrigger>
                  <SelectContent>
                    {networthRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Fee Amount (%)</label>
                <Input
                  type="number"
                  step="0.01"
                  value={newAgreement.feeAmount}
                  onChange={(e) => setNewAgreement({...newAgreement, feeAmount: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={newAgreement.isDiscretionary}
                  onCheckedChange={(checked) => 
                    setNewAgreement({...newAgreement, isDiscretionary: checked})}
                />
                <label className="text-sm font-medium">Discretionary Account</label>
              </div>

              <div>
                <label className="text-sm font-medium">Investment Objectives</label>
                <Select
                  value={newAgreement.investmentObjectives}
                  onValueChange={(value) => 
                    setNewAgreement({...newAgreement, investmentObjectives: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select objective" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="capital-preservation">Capital Preservation</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="growth">Growth</SelectItem>
                    <SelectItem value="aggressive-growth">Aggressive Growth</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Risk Tolerance</label>
                <Select
                  value={newAgreement.riskTolerance}
                  onValueChange={(value) => 
                    setNewAgreement({...newAgreement, riskTolerance: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select risk tolerance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conservative">Conservative</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="aggressive">Aggressive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="mt-4 space-x-2">
            <Button onClick={handleCreateAgreement}>
              <Send className="w-4 h-4 mr-2" />
              Send Agreement
            </Button>
            <Button variant="outline" onClick={() => setShowNewAgreement(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientAgreementsPage;