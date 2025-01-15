'use client'

import { Program } from '@/types'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { useQueryClient } from '@tanstack/react-query'
import { TrashIcon } from 'lucide-react'
import { api } from '@/services/api'

import CustomSelect from '@/components/CustomSelect'

export function BeneficiaryTab({ program, companies }: { program: Program, companies: any[] }) {
  const [selectedCompanies, setSelectedCompanies] = useState<{ id: string, editions: string[] }[]>([])
  useEffect(() => {
    if (program?.beneficiaries) {
      const formattedBeneficiaries = program.beneficiaries.map((beneficiary) => ({
        id: beneficiary.id,
        editions: beneficiary.ProgramBeneficiary.editions.map((edition) => {
          const matchedEdition = program.editions.find((e) => e.id === edition)
          return {
        label: matchedEdition ? matchedEdition.name.en : '',
        value: edition
          }
        })
      }))
      setSelectedCompanies(formattedBeneficiaries)
    }
  }, [program])
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const handleAddCompany = () => {
    setSelectedCompanies([...selectedCompanies, { id: '', editions: [] }])
  }

  const handleCompanyChange = (index: number, companyId: string) => {
    const updatedCompanies = [...selectedCompanies]
    updatedCompanies[index].id = companyId
    setSelectedCompanies(updatedCompanies)
  }

  const handleEditionsChange = (index: number, editions: string[]) => {
    const updatedCompanies = [...selectedCompanies]
    updatedCompanies[index].editions = editions
    setSelectedCompanies(updatedCompanies)
  }

  const handleRemoveCompany = (index: number) => {
    const updatedCompanies = selectedCompanies.filter((_, i) => i !== index)
    setSelectedCompanies(updatedCompanies)
  }

  const handleSubmit = async () => {
    try {
      const payload = selectedCompanies.map(company => ({
        companyId: company.id,
        programId: program.id,
        editions: company.editions.map((z: any) => z.value)
      }))

      await api.put(`/programs/beneficiary/beneficiaries/${program.id}`, payload)
      
      queryClient.invalidateQueries(['program', program.id])
      toast({
        title: 'Success',
        description: 'Companies and editions submitted successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit',
        variant: 'destructive',
      })
    }
  }

  console.log("selectedCompanies",selectedCompanies)
  console.log("program.beneficiaries",program?.beneficiaries)

  return (
    <div className="space-y-6">
      <Card className="space-y-6 py-3 px-3">
        <CardHeader>
          <CardTitle>Add New Beneficiary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {selectedCompanies.map((company, index) => (
              <div key={index} className="space-y-4">
                <select
                  className="border rounded-md"
                  value={company.id}
                  onChange={(e) => handleCompanyChange(index, e.target.value)}
                >
                  <option value="">Select a company</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>{company.name}</option>
                  ))}
                </select>
                <CustomSelect
                  label='Editions'
                  value={company.editions}
                  onChange={(value) => handleEditionsChange(index, value)}
                  options={program?.editions.map((edition) => ({
                    value: edition.id,
                    label: edition.name.en,
                  })) || []}
                  multiple
                />
                <Button variant="destructive" size="icon" onClick={() => handleRemoveCompany(index)}>
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button onClick={handleAddCompany}>Add Beneficiary</Button>
          </div>
        </CardContent>
            <Button onClick={handleSubmit}>Submit</Button>
      </Card>
    </div>
  )
}
