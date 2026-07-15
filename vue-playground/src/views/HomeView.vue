<script setup lang="ts">
import ConditionalStatements from '@/components/ConditionalStatements.vue'
import CounterPanel from '@/components/CounterPanel.vue'
import EmailValidation from '@/components/EmailValidation.vue'
import FormBindingSum from '@/components/FormBindingSum.vue'
import LifecycleDemo from '@/components/lifecycle/LifecycleDemo.vue'
import ProductCatalog from '@/components/product-context/ProductCatalog.vue'
import SuspenseFetch from '@/components/suspense/SuspenseFetch.vue'
</script>

<template>
  <main class="flex flex-col gap-8">
    <section class="flex flex-col gap-4">
      <h2 class="text-xl font-bold">Conditionals & lists</h2>
      <ConditionalStatements />
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="text-xl font-bold">Counters</h2>
      <div class="grid gap-4 sm:grid-cols-2">
        <CounterPanel title="Local state" :persist="false" />
        <CounterPanel title="Pinia store" :persist="true" />
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="text-xl font-bold">Form bindings & watchers</h2>
      <FormBindingSum />
      <EmailValidation />
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="text-xl font-bold">Provide / inject</h2>
      <ProductCatalog />
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="text-xl font-bold">Suspense</h2>
      <SuspenseFetch />
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="text-xl font-bold">Lifecycle hooks</h2>
      <LifecycleDemo />
    </section>
  </main>
</template>
