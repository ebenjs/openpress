import CustomDialog from '@/components/global/CustomDialog.vue'
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

describe('CustomDialog', () => {
  it('renders properly', () => {
    const wrapper = mount(CustomDialog, {
      slots: {
        body: 'Hello world'
      }
    })
    expect(wrapper.find('[data-test="body-slot"]').text()).toBe('Hello world')
    expect(wrapper.find('[data-test="close"]').exists()).toBe(true)
    wrapper.find('[data-test="close"]').trigger('click')
    expect(wrapper.emitted('close-dialog')).toBeTruthy()
  })
})
