import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Button, Image, Select, Text } from "@chakra-ui/react"
import { useState } from "react";
import { numberWithCommas } from "../../helpers/numberWithCommas";
import { shortenWord } from "../../helpers/shortenWord";

const CartItem = ({product, handleDelete}) => {
   const {_id, name, image, qty, price, countInStock} = product
   const [quantity, setQuantity] = useState(1);

  return (
    <div className="py-2 px-1 lg:px-5 flex items-center space-x-4 h-[100px] bg-slate-100 rounded-lg">
      <Box 
         w="70px" 
         h="70px" 
         overflow={"hidden"} 
         borderRadius="8px"
         flex={0.5}
      >
         <Image src={image} alt="cart image" objectFit="cover" w="100%" h="100%"/>
      </Box>
      <Box h="100%" className="space-y-1 flex flex-col lg:flex-row lg:items-center lg:space-y-0 lg:space-x-2" flex={1.5}>
         <Text flex={{ lg:'1'}} className="font-semibold text-base text-secondary-600">
            {shortenWord(name, 17)}
         </Text>
         <Select flex={{ lg:'1'}} value={qty} onChange={(e) => setQuantity(e.target.value)} maxW="70px" outline="none" border="2px" borderColor="default.600" variant="filled" disabled>
            {
            	[...Array(countInStock).keys()].map((x) => (
            		<option key={x + 1} value={x + 1}>
            			{x + 1}
            		</option>
            	))
            }
			</Select>
      </Box>
      <Box flex={1}>
         <h2>${numberWithCommas(qty * price)}</h2>
      </Box>
      <Box>
         <Button bg="gray.100" onClick={() => handleDelete(_id)}>
				<DeleteIcon color="red.500"/>
			</Button>
      </Box>
    </div>
  )
}

export default CartItem
