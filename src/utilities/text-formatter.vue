<script lang="ts">

export default function () {
  const capitalizeFirstChar = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return {
    capitalizeFirstChar
  }
}
</script>