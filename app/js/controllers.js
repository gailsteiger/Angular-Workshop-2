
/* Controllers */

function MyController($scope, YouTubeService) {
	$scope.queryString = "";
	$scope.playlistItems = [];
	$scope.queryResults = [];
	$scope.$watch('queryString', function(queryString) {

		var resultsPromise = YouTubeService.search($scope.queryString);
		$scope.queryResults = resultsPromise; // for real-time display update....

		resultsPromise.then( function( results) {
			// ...for getting it as a simple Array
			$scope.queryResults = results;
		});
	});

	$scope.moveToList = function(video) {
		if ($scope.playlistItems.indexOf(video) != -1 )
			return;
		$scope.playlistItems.push(video);
		var i = $scope.queryResults.indexOf(video);
		$scope.queryResults.splice(i,1);
	};

	$scope.$on('playVideo', function(event, url) {
		var video_id = url.split('v=')[1];
		var ampersandPos = video_id.indexOf('&');
		if (ampersandPos != -1) {
			$scope.videoId = video_id.substring(0, ampersandPos);
			$scope.nowPlaying = true;
		}
	})

}
