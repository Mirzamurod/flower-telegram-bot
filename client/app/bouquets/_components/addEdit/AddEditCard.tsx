import Input from '@/components/input'
import { TInputType } from '@/types/input'
import {} from 'react'

const AddEditCard = () => {
  const inputs: TInputType[] = [{ name: 'price' }, { name: 'name' }, { name: 'info' }]

  return (
    <div>
      <div className='grid grid-cols-3 gap-3'>
        {inputs.map(input => (
          <Input {...input} />
        ))}
      </div>
    </div>
  )
}

export default AddEditCard
