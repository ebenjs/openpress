<script lang="ts">
import moment from 'moment'

export default function () {
  const getCurrentDate = (format: string): string => {
    return moment().format(format)
  }

  const formatDate = (date: string, format: string): string => {
    return moment(date).format(format)
  }

  return {
    getCurrentDate,
    formatDate
  }
}
</script>
