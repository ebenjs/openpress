<script lang="ts">
import moment from 'moment'

export default function () {
  const getCurrentDate = (format: string): string => {
    return moment().format(format)
  }

  return {
    getCurrentDate
  }
}
</script>
