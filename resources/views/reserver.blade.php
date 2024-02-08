@extends('layout.app')

@section('content')
@if (!empty($ref))
<script>
    window.refCse = "{{ $ref }}";
</script>
@endif
<div class="max-w-screen-xl mx-auto">
    <div id="cse-resa"></div>
</div>
@endsection