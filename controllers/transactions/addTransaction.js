const { Transaction, User } = require('../../models')
const { BadRequest } = require('http-errors')

const add = async (userId, body) =>
  await Transaction.create({
    ...body,
    monthDate: body.date.split('.').slice(1).join('.'),
    owner: userId,
  })

// const updateBalance = async (_id, balance) =>
//   await User.findByIdAndUpdate(_id, { balance }, { new: true })

const addTransaction = async (req, res, next) => {
  try {
    const { amount } = req.body
    const { _id, balance } = req.user

    const expense = req.route.path === '/expence'

    // const newBalance = expense ? balance - amount : balance + amount

    // if (newBalance < 0) {
    //   throw new BadRequest('Not enough funds on your balance!')
    // }

    const transaction = await add(_id, {
      ...req.body,
      expense,
    })

    // await updateBalance(_id, newBalance)

    res.status(201).json({
      transaction: {
        date: transaction.date,
        description: transaction.description,
        category: transaction.category,
        amount: transaction.amount,
        _id: transaction._id,
      },
      // balance: newBalance,
    })

    console.log(transaction)
  } catch (error) {
    next(error)
  }
}

module.exports = { addTransaction }
