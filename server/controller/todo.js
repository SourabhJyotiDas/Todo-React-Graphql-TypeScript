export const createTodo = async (req, res, next) => {
   try {


      return res.status(201).json({
         success: true,
         message: "Todo Created successfully"
      })

   } catch (error) {
      return res.status(500).json({
         success: false,
         message: error.message
      })
   }
}