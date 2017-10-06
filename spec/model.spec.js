const chai = require('chai')
const expect = chai.expect
const { db, Tea } = require('../models')
const { createTeas } = require('../models/seed')
// createTeas saves 5 different types of teas to the database

describe('Tea Model', () => {
  before(() => db.sync({ force: true }))
  before('Creating test data...', createTeas)
  beforeEach(() => Tea.truncate())

  describe('Virtual: dollarPrice', () => {
    it('returns the price of the tea as a formatted string', () => {
      const tea = Tea.build({
        price: 500
      })

      expect(tea.dollarPrice).to.equal('$5.00')
    })
  })

  describe('Class Method: findByCategory', () => {
    xit('should find all teas in a given category', () =>
      Tea.findByCategory('black')
      .then(teas => {
        expect(teas).to.have.length(2)
      })
    )
  })

  describe('Instance Method: findSimilar', () => {
    xit('should find other teas of the same category as the instance', () => Tea.findOne({ where: { name: "Earl Grey" } })
      .then(earlGrey => earlGrey.findSimilar())
      .then(similarTeas => expect(similarTeas).to.have.length(1))
    )
  })

  describe('Hook', () => {
    it('should capitalize the name of the tea', () =>
      Tea.create({
        name: 'chai tea',
        price: 1095,
        description: 'This ancient recipe of black tea spiced with Indian herbs and spices produces a warm, soothing drink that will soothe and satisfy.',
        category: 'black'
      })
      .then(() => Tea.findById(1))
      .then(newTea => {
        expect(newTea.name).to.equal("Chai Tea")
      })
    )
  })
})
