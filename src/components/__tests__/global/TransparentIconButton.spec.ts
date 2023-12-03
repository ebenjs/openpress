import TransparentIconButton from '@/components/global/TransparentIconButton.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('TransparentIconButton', () => {
  const wrapper = mount(TransparentIconButton, {
    props: {
      icon: 'folder',
      width: '24px',
      height: '24px'
    }
  })
  it('renders properly', () => {
    expect(wrapper.find('[data-test="button"]').exists()).toBe(true)
  })

  it('shows the icon', () => {
    expect(wrapper.find('[data-test="icon"]').text()).toBe('folder')
  })

  it('has the correct width', () => {
    expect(wrapper.find('[data-test="button"]').attributes('style')).have.string('width: 24px')
  })

  it('has the correct height', () => {
    expect(wrapper.find('[data-test="button"]').attributes('style')).have.string('height: 24px')
  })
})
