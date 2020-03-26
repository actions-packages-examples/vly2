import React from 'react'
import test from 'ava'
import tagList from '../../../server/api/tag/__tests__/tag.fixture'
import { mountWithIntl, shallowWithIntl } from '../../../lib/react-intl-test-helper'
import OpOfferForm from '../OpOfferForm'
import sinon from 'sinon'
import { OpportunityStatus, OpportunityType } from '../../../server/api/opportunity/opportunity.constants'
const { sortedLocations } = require('../../../server/api/location/locationData')

// Initial opportunities
const op = {
  _id: '5cc903e5f94141437622cea7',
  name: 'Growing in the garden',
  subtitle: 'Growing digitally in the garden',
  imgUrl: 'https://image.flaticon.com/icons/svg/206/206857.svg',
  description: 'Project to grow something in the garden',
  duration: '15 Minutes',
  location: 'Newmarket, Auckland',
  date: [
    {
      $date: '2019-06-16T05:57:01.000Z'
    },
    {
      $date: '2019-06-23T05:57:01.000Z'
    }
  ],
  status: OpportunityStatus.DRAFT,
  startDate: null,
  endDate: null,
  tags: tagList,
  venue: 'street'
}

const blankAsk = {
  name: '',
  type: OpportunityType.ASK,
  subtitle: '',
  imgUrl: '',
  description: '',
  duration: '',
  location: '',
  status: OpportunityStatus.DRAFT,
  tags: [],
  startDate: null,
  endDate: null,
  date: []
}

const blankOffer = {
  name: '',
  type: OpportunityType.OFFER,
  subtitle: '',
  imgUrl: '',
  description: '',
  duration: '',
  location: '',
  status: OpportunityStatus.DRAFT,
  tags: [],
  startDate: null,
  endDate: null,
  date: []
}
// const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p`)
// global.window = dom// setting a mock window global object so the upload image component is not complaining
// global.SVGElement = Array
// Suppress console warning messages from async validator as they mess up the test output
const orginalWarn = console.warn

test.before('before test silence async-validator', () => {
  console.warn = (...args) => {
    if (typeof args[0] === 'string' && args[0].startsWith('async-validator:')) return
    orginalWarn(...args)
  }
})

test.after.always(() => {
  console.warn = orginalWarn
})

test('shallow the detail with op', t => {
  const wrapper = shallowWithIntl(
    <OpOfferForm
      op={op}
      onSubmit={() => {}}
      onCancel={() => {}}
      existingLocations={sortedLocations}
      existingTags={[]}
    />
  )
  t.is(wrapper.find('OpOfferForm').length, 1)
})

test('render the detail with op', t => {
  const submitOp = sinon.spy()
  const cancelOp = sinon.spy()
  const me = { _id: '5ccbffff958ff4833ed2188d' }
  const wrapper = mountWithIntl(
    <OpOfferForm
      op={op}
      me={me}
      onSubmit={submitOp}
      onCancel={cancelOp}
      existingLocations={sortedLocations}
      existingTags={[]}
    />
  )
  t.is(wrapper.find('OpOfferForm').length, 1)
  t.is(wrapper.find('button').length, 3)
  wrapper.find('#cancelOpBtn').first().simulate('click')
  t.truthy(cancelOp.calledOnce)
  wrapper.find('#saveOpBtn').first().simulate('click')
  t.truthy(submitOp.calledOnce)
  t.truthy(submitOp.calledWith(op))

  wrapper.find('#publishOpBtn').first().simulate('click')
  t.truthy(submitOp.calledTwice)
  t.truthy(submitOp.calledWith(op))
})

test('render the detail with new blank ask op', t => {
  const submitOp = sinon.fake()
  const cancelOp = sinon.fake()
  const me = { _id: '5ccbffff958ff4833ed2188d' }

  const wrapper = mountWithIntl(
    <OpOfferForm
      op={blankAsk}
      me={me}
      onSubmit={submitOp}
      onCancel={cancelOp}
      existingLocations={sortedLocations}
      existingTags={[]}
    />
  )
  t.log(wrapper.first())
  const datePicker = wrapper.find('.ant-calendar-picker')
  datePicker.at(0).simulate('click') // Check if the dissable date method got called
  datePicker.at(1).simulate('click') // Check if the dissable date method got called
  t.is(datePicker.length, 2) // should find 1 date picker component

  t.is(wrapper.find('OpOfferForm').length, 1)
  t.is(wrapper.find('button').length, 3) // cancel, save and publish
  wrapper.find('button').first().simulate('click')
  t.truthy(cancelOp.calledOnce)

  // can't click submit until fields entered
  wrapper.find('Form').first().simulate('submit')
  t.falsy(submitOp.calledOnce)
  wrapper.update()
  // find name field.
  const name = wrapper.find('input#opportunity_detail_form_name').first()
  // name.node.value = 'Test'
  name
    .simulate('keydown', { which: 'a' })
    .simulate('change', { target: { value: 'My new value' } })

  const locationInput = wrapper.find('LocationSelector').first()
  locationInput.props().onChange('Auckland')

  wrapper.update()

  const duration = wrapper.find('input#opportunity_detail_form_duration').first()
  duration.simulate('change', { target: { value: '10 hours' } })

  wrapper.find('#saveOpBtn').first().simulate('click')
  t.truthy(submitOp.calledOnce)
  t.is(submitOp.args[0][0].type, OpportunityType.ASK)
  t.is(submitOp.args[0][0].name, 'My new value')
})

test('render the detail with new blank offer op', t => {
  const submitOp = sinon.fake()
  const cancelOp = sinon.fake()
  const me = { _id: '5ccbffff958ff4833ed2188d' }

  const wrapper = mountWithIntl(
    <OpOfferForm
      op={blankOffer}
      me={me}
      onSubmit={submitOp}
      onCancel={cancelOp}
      existingLocations={sortedLocations}
      existingTags={[]}
    />
  )
  t.log(wrapper.first())
  const datePicker = wrapper.find('.ant-calendar-picker')
  datePicker.at(0).simulate('click') // Check if the dissable date method got called
  datePicker.at(1).simulate('click') // Check if the dissable date method got called
  t.is(datePicker.length, 2) // should find 1 date picker component

  t.is(wrapper.find('OpOfferForm').length, 1)
  t.is(wrapper.find('button').length, 3) // cancel, save and publish
  wrapper.find('button').first().simulate('click')
  t.truthy(cancelOp.calledOnce)

  // can't click submit until fields entered
  wrapper.find('Form').first().simulate('submit')
  t.falsy(submitOp.calledOnce)
  wrapper.update()
  // find name field.
  const name = wrapper.find('input#opportunity_detail_form_name').first()
  // name.node.value = 'Test'
  name
    .simulate('keydown', { which: 'a' })
    .simulate('change', { target: { value: 'My new value' } })

  const locationInput = wrapper.find('LocationSelector').first()
  locationInput.props().onChange('Auckland')

  wrapper.update()

  const duration = wrapper.find('input#opportunity_detail_form_duration').first()
  duration.simulate('change', { target: { value: '10 hours' } })

  wrapper.find('#saveOpBtn').first().simulate('click')
  t.truthy(submitOp.calledOnce)
  t.is(submitOp.args[0][0].type, OpportunityType.OFFER)
  t.is(submitOp.args[0][0].name, 'My new value')
})

test('Save a op as draft with correct validation', async t => {
  const submitOp = sinon.spy()
  const cancelOp = sinon.spy()
  const me = {
    _id: '5ccbffff958ff4833ed2188d',
    orgMembership: [
      {
        organisation: {
          _id: 'a',
          name: 'Careys org',
          slug: 'carey-org'
        }
      }
    ]
  }

  const wrapper = mountWithIntl(
    <OpOfferForm
      op={op}
      me={me}
      onSubmit={submitOp}
      onCancel={cancelOp}
      existingLocations={sortedLocations}
      existingTags={[]}
    />
  )

  t.is(wrapper.find('OpOfferForm').length, 1)
  t.truthy(wrapper.find('.name'))

  const name = wrapper.find('.name').first()
  name.simulate('change', { target: { value: 'bob' } })

  t.truthy(wrapper.find('.organisation'))

  const org = wrapper.find('.organisation').first()
  org.simulate('click')
  wrapper.find('.ant-select-dropdown li').first().simulate('click')

  const draftButton = wrapper.find('#saveOpBtn').first()
  draftButton.simulate('click')

  t.truthy(submitOp.calledOnce)

  t.is(wrapper.find('.ant-form-explain').length, 0)
})

test('Publish a op with correct validation', t => {
  const submitOp = sinon.spy()
  const cancelOp = sinon.spy()
  const me = {
    _id: '5ccbffff958ff4833ed2188d',
    orgMembership: [
      {
        organisation: {
          _id: 'a',
          name: 'Careys org',
          slug: 'carey-org'
        }
      }
    ]
  }

  const wrapper = mountWithIntl(
    <OpOfferForm
      op={op}
      me={me}
      onSubmit={submitOp}
      onCancel={cancelOp}
      existingLocations={sortedLocations}
      existingTags={[]}
    />
  )

  t.is(wrapper.find('OpOfferForm').length, 1)
  t.truthy(wrapper.find('.name'))

  const name = wrapper.find('.name').first()
  name.simulate('change', { target: { value: 'bob' } })

  const subtitle = wrapper.find('.subtitle').first()
  subtitle.simulate('change', { target: { value: 'bobs oportunity' } })

  t.truthy(wrapper.find('.organisation'))
  const org = wrapper.find('.organisation').first()
  org.simulate('click')
  wrapper.find('.ant-select-dropdown li').first().simulate('click')

  const commitment = wrapper.find('.commitment').first()
  commitment.simulate('change', { target: { value: '8 hours' } })

  const publishButton = wrapper.find('#publishOpBtn').first()
  publishButton.simulate('click')

  t.truthy(submitOp.calledOnce)

  t.is(wrapper.find('.ant-form-explain').length, 0)
})