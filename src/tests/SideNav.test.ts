import { mount } from "@vue/test-utils"
import { defineComponent, h } from "vue"
import SideNav from "@/components/SideNav.vue"
import { createActivityLog, type UseActivityLog } from "@/composables/useActivityLog"
import { createTheme } from "@/composables/useTheme"

const Host = defineComponent({
  setup(_, { expose }) {
    const log = createActivityLog()
    createTheme()
    expose({ log })
    return () => h(SideNav)
  },
})

test("renders an empty state message when the activity log has no entries", () => {
  const wrapper = mount(Host, { attachTo: document.body })

  expect(wrapper.get(".side-nav__empty-message").text()).toBe("No activity logged")
  expect(wrapper.findAll(".side-nav-item")).toHaveLength(0)

  wrapper.unmount()
})

test("renders one item per activity log entry reflecting its position and timestamp", async () => {
  const now = 1_700_000_000_000
  vi.spyOn(Date, "now").mockReturnValue(now)

  const wrapper = mount(Host, { attachTo: document.body })
  const { log } = wrapper.vm as unknown as { log: UseActivityLog }

  log.push({ file: "e", rank: 4 })
  log.push({ file: "d", rank: 5 })

  await wrapper.vm.$nextTick()

  const items = wrapper.findAll(".side-nav-item")
  expect(items).toHaveLength(2)
  expect(wrapper.find(".side-nav__empty-message").exists()).toBe(false)

  const [first, second] = items
  expect(first.get(".side-nav-item__title").text()).toBe("e4")
  expect(first.get(".side-nav-item__date").text()).toBe(new Date(now).toLocaleTimeString())

  expect(second.get(".side-nav-item__title").text()).toBe("d5")
  expect(second.get(".side-nav-item__date").text()).toBe(new Date(now).toLocaleTimeString())

  wrapper.unmount()
})
